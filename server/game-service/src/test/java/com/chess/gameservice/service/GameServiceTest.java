package com.chess.gameservice.service;

import com.chess.gameservice.exception.GameException;
import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.piece.Pawn;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.messages.payloads.AvailableMovesPayload;
import com.chess.gameservice.messages.payloads.PlayerMovePayload;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;

import java.util.ArrayList;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class GameServiceTest {

    GameService gameService;

    @Mock
    private ApplicationEventPublisher applicationEventPublisher;

    private UUID gameId = new UUID(8, 8);
    private String firstPlayerName = "firstPlayer";
    private String secondPlayerName = "secondPlayer";

    @BeforeEach
    void setUp() {
        gameService = new GameService(applicationEventPublisher);
    }

    @Test
    void initialConnect() {
        Game game = gameService.initialConnect(gameId, firstPlayerName);

        assertNull(game);

        game = gameService.initialConnect(gameId, secondPlayerName);

        assertNotNull(game);
        assertNotNull(game.getPlayers().get(PlayerColor.BLACK));
        assertNotNull(game.getPlayers().get(PlayerColor.WHITE));
    }

    @Test
    void getAvailableMoves() throws GameException {
        gameService.initialConnect(gameId, firstPlayerName);
        gameService.initialConnect(gameId, secondPlayerName);

        var pawnPosition = new Position(6, 5);
        var expectedMoves = new ArrayList<Position>();
        expectedMoves.add(new Position(5, 5));
        expectedMoves.add(new Position(4, 5));
        var expectedAvailableMoves = new AvailableMovesPayload();
        expectedAvailableMoves.setPosition(pawnPosition);
        expectedAvailableMoves.setAvailableMoves(expectedMoves);

        var availableMoves = gameService.getAvailableMoves(gameId, pawnPosition, firstPlayerName);

        assertEquals(expectedAvailableMoves, availableMoves);
    }

    @Test
    void move() throws GameException {
        gameService.initialConnect(gameId, firstPlayerName);
        gameService.initialConnect(gameId, secondPlayerName);
        var initialPosition = new Position(6, 7);
        var destinationPosition = new Position(5, 7);
        var playerMove = new PlayerMovePayload(initialPosition, destinationPosition);

        var gameAfterMove = gameService.makeMove(gameId, playerMove, firstPlayerName);

        assertTrue(gameAfterMove.getBoard().getState()[5][7] instanceof Pawn);
    }
}
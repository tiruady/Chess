package com.chess.gameservice.service;

import com.chess.gameservice.game.Game;
import com.chess.gameservice.game.player.Player;
import com.chess.gameservice.game.player.PlayerColor;
import com.chess.gameservice.game.position.Position;
import com.chess.gameservice.models.AvailableMoves;
import com.chess.gameservice.models.PlayerMove;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;


@Service
public class GameService {

    private HashMap<UUID, Game> games = new HashMap<>();

    public synchronized Game initialConnect(UUID gameId, String playerName) {
        Game game = games.get(gameId);

        if (game == null) {
            games.put(gameId, null);
            game = new Game();
            var player = new Player(playerName);
            game.setPlayer(player, PlayerColor.WHITE);
            games.put(gameId, game);

            return null;
        }

        var player = new Player(playerName);
        game.setPlayer(player, PlayerColor.BLACK);
        game.initGame();

        return game;
    }

    public AvailableMoves getAvailableMoves(UUID gameId, Position position, String name) {
        var game = games.get(gameId);
        var player = new Player(name);
        var availableMoves = new AvailableMoves();
        availableMoves.setPosition(position);
        availableMoves.setAvailableMoves(game.getAvailableMoves(position, player));
        return availableMoves;
    }

    public Game makeMove(UUID gameId, PlayerMove playerMove, String playerName) {
        var game = games.get(gameId);
        var player = new Player(playerName);
        game.makeMove(playerMove, player);
        return game;
    }
}

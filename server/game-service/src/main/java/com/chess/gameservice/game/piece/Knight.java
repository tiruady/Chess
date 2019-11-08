package com.chess.gameservice.game.piece;

import com.chess.gameservice.game.board.Board;
import com.chess.gameservice.game.position.Position;

import java.util.ArrayList;

public class Knight extends Piece {

    @Override
    public ArrayList<Position> getAvailableMoves(Board board, Position initialPosition) {
        var availableMoves = new ArrayList<Position>();

        int[] dx = {-2, -2, -1, 1, 2, 2, 1, -1};
        int[] dy = {-1, 1, 2, 2, 1, -1, -2, -2};

        for (int i = 0; i < 8; i++) {
            int newPositionX = initialPosition.getX() + dx[i];
            int newPositionY = initialPosition.getY() + dy[i];

            var position = new Position(newPositionX, newPositionY);
            if (position.isWithinBounds() && board.isBoardPositionEmpty(position)) {
                availableMoves.add(position);
            }
        }
        return availableMoves;
    }

    @Override
    public boolean isMoveLegal(Position currentPosition, Position destinationPosition) {
        if (!destinationPosition.isWithinBounds()) {
            return false;
        }

        int dx = Math.abs(currentPosition.getX() - destinationPosition.getX());
        int dy = Math.abs(currentPosition.getY() - destinationPosition.getY());

        return (dx == 1 && dy == 2 || dx == 2 && dy == 1);
    }
}

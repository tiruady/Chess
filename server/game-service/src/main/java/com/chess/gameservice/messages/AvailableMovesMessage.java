package com.chess.gameservice.messages;

import com.chess.gameservice.models.AvailableMoves;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public
class AvailableMovesMessage extends Message<AvailableMoves> {

    public AvailableMovesMessage() {
        type = MessageTypes.AVAILABLE_MOVES;
    }
}

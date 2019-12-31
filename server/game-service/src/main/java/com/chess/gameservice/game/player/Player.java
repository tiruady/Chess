package com.chess.gameservice.game.player;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;

@Getter
@Setter
@NoArgsConstructor
public class Player {

    @JsonIgnore
    private final int GAME_TIME = 300;
    @JsonIgnore
    private PlayerStopwatch playerStopwatch;

    String name;
    Duration totalTurnTimeRemaining = Duration.ofSeconds(GAME_TIME);

    public Player(String name) {
        this.name = name;
        this.playerStopwatch=new PlayerStopwatch();
    }

    public void startTurn() {
        playerStopwatch.start();
    }

    public void endTurn() {
        Duration turnTime = playerStopwatch.end();
        setTotalTurnTimeRemaining(totalTurnTimeRemaining.minus(turnTime));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return name.equals(player.name);
    }
}

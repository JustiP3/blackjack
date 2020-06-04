class PlayersController < ApplicationController
    def create         
        player = Player.find_by(id: params["id"])

        unless player 
            player = Player.new
        end 

        player.name = params["id"]

        if player.save 
            render json: player      
        else 
            render json: player.errors 
        end    
    end
end

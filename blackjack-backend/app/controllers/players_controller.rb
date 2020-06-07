class PlayersController < ApplicationController
    def create         
        player = Player.find_by(name: params["id"])

        if !!player 
            render json: player
        else             
            player = Player.new
            player.name = params["id"]
            
            if player.save 
                render json: player      
            else 
                render json: player.errors 
            end 
        end     
    end

    
end

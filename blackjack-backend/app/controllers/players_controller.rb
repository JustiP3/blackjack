class PlayersController < ApplicationController
    def create               
        player = Player.new
        player.name = params["id"]
            
        if player.save 
            render json: player      
        else 
            render json: player.errors 
        end     
    end

    def show 
        player = Player.find_by(name: params["id"])
        render json: player
    end 

    
end

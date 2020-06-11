class StatisticsController < ApplicationController
    def index 
        
        if !!params["player_id"]
            all_statistics = Statistic.where("player_id = #{params["player_id"]}")
        else 
            all_statistics = Statistic.all 
        end    
         
        render json: all_statistics.to_json
    end 

    def create         
        stats = Statistic.new

        stats.player_id = params["id"]
        stats.win_count = params["stats"]["wins"]
        stats.loss_count = params["stats"]["losses"]
        stats.bust_count = params["stats"]["bustCount"]
         
        if stats.save 
            render json: stats 
        else 
            render json: stats.errors
        end 
        
    end 

    def update
        stats = Statistic.find_by(id: params["id"])     

        stats.win_count = params["stats"]["wins"]
        stats.loss_count = params["stats"]["losses"]
        stats.bust_count = params["stats"]["bustCount"] 
         
        if stats.save 
            render json: stats 
        else 
            render json: stats.errors
        end
    end 

    def destroy 
        statistic = Statistic.find_by(id: params["id"])
        player_id = statistic.player_id

        statistic.destroy

        stats_remaining = Statistic.where("player_id = #{player_id}")
        
        render json: stats_remaining
    end 
end

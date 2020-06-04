class StatisticsController < ApplicationController
    def index 
        all_statistics = Statistic.all 
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
        stats = Statistic.find_by(params["id"])     

        stats.win_count = params["stats"]["wins"]
        stats.loss_count = params["stats"]["losses"]
        stats.bust_count = params["stats"]["bustCount"] 
         
        if stats.save 
            render json: stats 
        else 
            render json: stats.errors
        end
    end 
end

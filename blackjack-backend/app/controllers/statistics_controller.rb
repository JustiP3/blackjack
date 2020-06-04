class StatisticsController < ApplicationController
    def index 
        all_statistics = Statistic.all 
        render json: all_statistics.to_json
    end 

    def create         
        player_id = params["id"]
        win_count = params["stats"]["wins"]
        loss_count = params["stats"]["losses"]
        bust_count = params["stats"]["bustCOunt"]

        stats = Statistic.new

        stats.player_id = player_id
        stats.win_count = win_count
        stats.loss_count = loss_count
        stats.bust_count = bust_count
         
        stats.save 
        render json: stats 
        
    end 

    def update
    end 
end

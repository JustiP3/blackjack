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
        user_stats = Statistic.where("player_id = #{params["id"]}")
        user_stats.each do |stat|
            Statistic.destroy(stat.id)
        end 
        render json: user_stats
    end 
end

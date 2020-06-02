class StatisticsController < ApplicationController
    def index 
        all_statistics = Statistic.all 
        render json: all_statistics.to_json
    end 
end

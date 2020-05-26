class CreateStatistics < ActiveRecord::Migration[6.0]
  def change
    create_table :statistics do |t|
      t.integer :win_count, default: 0
      t.integer :loss_count, default: 0 
      t.integer :bust_count, default: 0
      t.integer :player_id 

      t.timestamps
    end
  end
end

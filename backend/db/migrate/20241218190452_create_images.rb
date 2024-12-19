class CreateImages < ActiveRecord::Migration[7.2]
  def change
    create_table :images do |t|
      t.string :name
      t.string :file_path

      t.timestamps
    end
  end
end

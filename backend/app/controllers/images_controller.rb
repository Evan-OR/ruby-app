class ImagesController < ApplicationController
  require "mini_magick"

  def create
    # Validate file presence
    return render json: { error: "No file provided" }, status: :unprocessable_entity unless params[:image]

    # Process the uploaded file
    uploaded_file = params[:image]
    custom_file_name = params[:customFileName]+".jpg"
    original_filename = uploaded_file.original_filename
    file_path = Rails.root.join("public", "img", original_filename)

    # Save the original image locally
    File.open(file_path, "wb") do |file|
      file.write(uploaded_file.read)
    end

    # Resize the image
    resized_path = Rails.root.join("public", "img", "#{custom_file_name}")
    image = MiniMagick::Image.open(file_path)
    image.resize "512x512"
    image.write(resized_path)

    # Save metadata to the database
    image_record = Image.create!(file_path: "#{custom_file_name}")

    # Respond with the image URL
    render json: { url: "/img/#{custom_file_name}" }, status: :created
  end

  def show
    image = Image.find_by(file_path: params[:file_path])

    if image
      send_file Rails.root.join("public", "img", image.file_path), type: "image/jpeg", disposition: "inline"
    else
      render json: { error: "Image not found" }, status: :not_found
    end
  end
end

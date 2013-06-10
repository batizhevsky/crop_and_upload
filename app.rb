get '/' do
  erb :index
end

post "/avatar" do
  @avatar = params[:avatar] 
  erb :avatar
end

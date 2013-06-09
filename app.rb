get '/' do
  erb :index
end

post "/avatar" do
  params.inspect 
end

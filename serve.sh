#!/bin/bash

port=$1
if [ $port > 0 ] 
then			
	service=crud_node
	echo "Compiling $service image"
	docker build -t $service .
	echo "Killing docker process running on $port port"
	docker stop $(sudo docker ps | grep 0.0.0.0:$port | awk '{print $1}')
	echo "Starting docker process on $port port on backgroud with name $service"
	sudo docker run --rm -dp $port:3000 $service
else
	echo "Error: Inform a port as firt argument. Example: sudo ./serve 8001" 
fi
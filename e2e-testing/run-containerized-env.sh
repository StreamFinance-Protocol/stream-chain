<<<<<<< HEAD
cd ../protocol
make build-e2e-ethos-test
cd ../e2e-testing
<<<<<<< HEAD

#when building w/o  a cache you must split the command into two
=======
>>>>>>> 552bd4378 (e2e test)
=======


>>>>>>> 613d96696 (checkpoint)
docker-compose -f docker-compose-e2e-test.yml build --no-cache
docker-compose -f docker-compose-e2e-test.yml up -d
cd ../protocol
make e2e-setup
cd ../e2e-testing
chmod +x port-forwarder.sh
bash -c "./port-forwarder.sh"
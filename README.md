##### Chegamos em um ponto em que não conseguimos mais continuar usando o sqlite e vamos alterar o banco para o MySQL.
  ###### comando utilizado para rodar o Docker: docker run --name nomeDoSeuContainer -e MYSQL_ROOT_PASSWORD=suaSenha -p 3306:3306 mysql:latest
  ###### comando utilizado para iniciar o container docker start mysql
  ###### comando utilizado para parar o container: docker stop mysql
  ###### comando ver qual é o id do container: docker container ls
  ###### comando ver um inspect para ver ip outra coisa: docker container inspect "62e019b5d3f9"=id do container 
  ###### comando para roda comando sql no docker : docker exec -it "62e019b5d3f9"=id do container bash

  ###### acessa seu banco de dados caso queira mysql -u root -p

resource "aws_instance" "existing_ec2" {
  ami           = "ami-0303e2e4a29f041a3"
  instance_type = "t3.micro"

  key_name = "devops-ec2-key"

  subnet_id = "subnet-057e3ccc2cea025f5"

  vpc_security_group_ids = [
    "sg-04fdbe19547410b39"
  ]

  tags = {
    Name = "dockerized-node-app"
  }
}
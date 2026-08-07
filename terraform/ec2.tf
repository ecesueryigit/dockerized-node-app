resource "aws_instance" "existing_ec2" {
  ami           = "ami-0303e2e4a29f041a3"
  instance_type = var.instance_type

  key_name = var.key_name

  subnet_id = var.subnet_id

  vpc_security_group_ids = [
    var.security_group_id
  ]

  tags = {
    Name = var.instance_name
  }
}
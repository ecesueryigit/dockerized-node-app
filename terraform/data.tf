data "aws_vpc" "existing" {
    id = aws_instance.existing_ec2.vpc_id
}
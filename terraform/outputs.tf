output "instance_id" {
    value = aws_instance.existing_ec2.id
}

output "public_ip" {
    value = aws_instance.existing_ec2.public_ip
}

output "private_ip" {
    value = aws_instance.existing_ec2.private_ip
}

output "vpc_id_from_data_source" {
    value = data.aws_subnet.existing.vpc_id
}
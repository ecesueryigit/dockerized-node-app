output "security_group_id" {
    description= "ID of the Terraform Security Group"
    value= aws_security_group.terraform_test_sg.id
}

output "security_group_name" {
    description= "Name of the Terraform Security Group"
    value= aws_security_group.terraform_test_sg.name
}

output "current_region" {
    value = data.aws_region.current.name
}

output "account_id" {
    description = "AWS Account ID"
    value = data.aws_caller_identity.current.account_id
}

output "caller_arn" {
    description = "Current IAM ARN"
    value = data.aws_caller_identity.current.arn
}

output "default_vpc_id" {
    description = "Default VPC Id"
    value = data.aws_vpc.default.id
}
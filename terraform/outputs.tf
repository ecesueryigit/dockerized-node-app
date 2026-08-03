output "security_group_id" {
    description= "ID of the Terraform Security Group"
    value= aws_security_group.terraform_test_sg.id
}

output "security_group_name" {
    description= "Name of the Terraform Security Group"
    value= aws_security_group.terraform_test_sg.name
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "security_group_name" {
  description = "Security Group name"
  type        = string
  default     = "terraform-test-sg"
}
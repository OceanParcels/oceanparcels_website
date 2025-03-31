export interface TeamMemberLinks {
  github?: string
  researchgate?: string
  googlescholar?: string
  [key: string]: string
}

export interface CurrentTeamMember {
  name: string
  position: string
  description: string
  image: string
  links?: TeamMemberLinks
}

export interface PriorTeamMember {
  name: string
  position: string
  links?: TeamMemberLinks
}

---
layout: content
permalink: /faq
---


[//]: # (Look into putting each About ... into a drop-down menu. Such that when About... text is pressed, the Q&As for that About... section are displayed. Or have anchors to each one, which can be navigated from the green About... text)

# **Frequently Asked Questions**
{: style="text-align: center;"}
---

Add some general text about what this FAQ contains, etc, etc.
Also, this lengthy text is in part to test how a centered field looks... it looks nice :D.
{: style="text-align: center;"}   
<!--<a href="#VTOrganizationMembership"> -->
<span style= "color:#159957">About VT Organization Membership</span>  
<!--</a> --> 
<!--<a href="#Repositories">-->
<span style= "color:#159957">About Repositories</span>  
<!--</a>  -->
<!--<a href="#Teams">-->
<span style= "color:#159957">About Teams</span>  
<!--</a>  -->
<!--<a href="#PermissionLevels">-->
<span style= "color:#159957">About Permission Levels</span>  
<!--</a>  -->
<!--<a href="#Projects">-->
<span style= "color:#159957">About Projects</span>  
<!--</a>-->
{: style="text-align: center;"} 
Have a question that isn’t answered here? Contact us, at <github-g@vt.edu>. 
{: style="text-align: center;"} 
---

## **<a name = "VTOrganizationMembership" class= "inactiveLink">About VT Organization Membership</a>**
---

#### **Q**: How do I become a member of the VT GitHub Organization?
**A**: Membership to the VT GitHub Organization is limited to current and former Virginia Tech staff and students, through invitation only. To register for membership, visit the Virginia Tech GitHub Page and --navigate to the ‘apply to organization’ subpage--. Once there, enter your GitHub account username and VT email address. A verification email will be sent to the supplied VT email address. Once verified, an invitation to join the VT Organization will be sent to the email address associated with your GitHub account. 

_Note: Verification emails will only be sent to @vt.edu email addresses._

#### **Q**: As a member, what can and can’t I do?
**A**: You **can** view the profiles and public teams of other members. You **can** apply for your repository to be added to the Organization; refer to _“About Repositories”_. You **can** create Teams; refer to _“About Teams”_. You **can** create Organization Projects; refer to _“About Projects”_. You **cannot** create/transfer repositories from your account directly to the Organization. You **cannot** invite other users to the Organization. You **cannot** push to repositories that you do not have write access to.


## **<a name = "Repositories" class= "inactiveLink">About Repositories</a>**
---

#### **Q**: How do I add my repository into the VT GitHub Organization?
**A**: VT GitHub Organization members can only add a repository by emailing an application for their repository to the owners of the VT Organization at <github-g@vt.edu>.  If the application is approved, an owner from the VT Organization will fork your repository into the organization.  Since all permissions are wiped when the repository is forked, the owner will grant you admin privileges to the forked repository.  If the application is denied, an owner for the VT GitHub Organization will provide you with an explanation of why your repository was denied in an email response.

_Note:  Before submitting an application, members should verify that their prospective repository meets the policies required by the VT GitHub Organization._

#### **Q**: Can I add a repository that is private?
**A**: Yes, a member can add a private repository. Private repositories do not become public when forked. However, in order for private repositories to be added to the Organization, the user will need to add an owner as a collaborator. More information will be provided in an email if the repository is approved.

#### **Q**: Am I required to provide an open-source software license for the repository I would like to add to the VT Organization?
**A**: See the **FIX--** **Licensing - FAQ** **--FIX** section.

#### **Q**: As VT Organization member, can I create a repository within the organization?
**A**: No, repositories can not be created within the organization.  Repositories can only be added to the organization by being forked by a VT Organization owner; see this question.

#### **Q**: As VT Organization member, can I delete a repository within the organization?
**A**: As a member, you can only delete a repository to which you have admin permissions to.

#### **Q**: As a VT organization member and the admin of a forked repository on the Organization, how can I manage permissions to the repository?
**A**: As an admin, you can manage permissions by creating new teams or adding existing teams to a repository.  To learn more about how GitHub teams work, go here.  An admin can also add individual collaborators to a repository with read, write, or admin privileges.  Unlike VT Organization teams, individual collaborators do not need to be members within the VT Organization.

#### **Q**: What are pinned repositories?
**A**: Pinned repositories show up at the top of the Organization’s home page and offer an increase in exposure. Newly pinned repositories will stay pinned for two weeks. There can only be a max of six pinned repositories at a time. Private repositories cannot be pinned. Repositories that are currently pinned **should not** apply for additional pin-time, but should instead wait until after their pin-time expires. The goal of this Organization is to give exposure to VT code projects, so a queue of pinned repositories may be formed simply through an excess of pin-worthy applications.

#### **Q**: How do I get my repository pinned?
**A**: To request your repository to be pinned, you will need to contact the Organization owners, at <github-g@vt.edu>. In your email to the owners, make sure to include your repository’s name as well as why you think your repository deserves to be pinned. While it is not necessary, a repository README would help Organization users understand the purpose of your repository. Finally, consider member demand for pinned repositories when emailing the owners; don’t feel discouraged if your repository does not get pinned after your first attempt!



## **<a name = "Teams" class= "inactiveLink">About Teams</a>**
---

#### **Q**: What is a GitHub team?
**A**: Teams are a way for organization members to manage permissions to repositories within the organization.

TODO: Make example more extensive --Matt

_Ex.  Matt, Teddy, and Bob are members of Team A.  As members of Team A, Matt, Teddy, and Bob have Admin permissions for Repository X, Write permissions for Repository Y, and Read permissions for Repository Z._

#### **Q**: Who can create a team?
**A**: Any VT Organization member can create a team.

#### **Q**: Who can edit a team’s settings (team name, description, visibility)?
**A**: Only the team’s maintainers can edit the team’s settings.

#### **Q**: Who can delete a team?
**A**: Only the team’s maintainers can delete the team.

#### **Q**: What are the different roles within a team?
**A**: There are two different roles within a team, team members and team maintainers

#### **Q**: What can a team member do within a team?
**A**: A team member has access to each of the team’s repositories based on permission levels set by an admin of the repository.  The admin of the repository can be, but does not have to be, a member or maintainer of the team.

#### **Q**: How do I become a team member?
**A**: You can become a team member by being manually added by a team maintainer or by going to the team page and requesting membership.  A team maintainer would then approve or deny your request.

#### **Q**: What can a team maintainer do within a team?
**A**: A team maintainer is a team member with elevated permissions around who is in the team and what repositories the team contributes to.  A team maintainer can add an organization member to the team, as well as, remove a team member from the team.  Team maintainers can promote other team members to team maintainers.  A team maintainer can also add a repository to the team to which the maintainer has admin access to.

#### **Q**: How do I become a team maintainer?
**A**: You can become a team maintainer by getting one of the current team maintainers to promote you.  As expected, when you create your own team you become the team maintainer of your new team by default.

#### **Q**: Can I be on multiple teams within the VT Organization?
**A**: Yes, you can be on as many teams as you want.

#### **Q**: Can I be a team maintainer of multiple teams within the VT Organization?
**A**: Yes, you can.


# **<a name = "PermissionLevels" class= "inactiveLink">About Permission Levels</a>**
---

#### **Q**: What does the _admin_ permission entail?
**A**: Admin permission gives the team/collaborator the ability to modify (add/remove/change) the access rights of their repository and thereby give rights to organization members as well as organization teams. Admin permission also gives the team/collaborator the _write_ permission.

#### **Q**: What does the _write_ permission entail?
**A**: Write permission gives the team/collaborator the ability to read, clone, and push to the repository.

#### **Q**: What does the _read_ permission entail? 
**A**: Read permission gives the team/collaborator the ability to read and clone the repository. 


# **<a name = "Projects" class= "inactiveLink">About Projects</a>**
---

#### **Q**: What are projects?
**A**: Projects help you organize and prioritize your work. Projects are made up of issues, pull requests, and notes that are categorized as cards in columns of your choosing. Cards can be moved from column to column and reordered according to your needs. More information can be found [here](https://help.github.com/articles/about-projects/){:target="_blank"}.

#### **Q**: What’s the difference between Organization projects and Team projects?
**A**: Organization projects can be viewed and edited by any member within the organization. Team projects can be viewed by any member within a team and edited by any member within that team that has write or admin permissions.
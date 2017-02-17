---
layout: content
permalink: /add_repository
---

# **Organization Repository Application**
{:style="text-align: center;"}
---

## **Application Process**  
Applying to add your Repository to the Organization is easy:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1.** Input your name  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.** Input your GitHub Username  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3.** Input the name of the Repository you want to be added  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**4.** Briefly describe the Repository's function and purpose  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**5.** Include your Repository's opensource lisence, if it has one.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**6.** Apply  
The information you give will then be sent to the GitHub Coordinators for review. You should hear back from us with the result of your application within a week. If you have not heard back from us in over a week, please re-apply your Repository.

---

## **Repository Restrictions**  
All applying Repositories **must** adhere to the Virginia Tech [Policies](http://www.policies.vt.edu/index.php) and [Honor Code](http://honorsystem.vt.edu/HSConstitution/honor_code_manual_and_policy.html). Any Repositories that break these guidelines will be denied. Some examples of unacceptable Repositories include: Course-Snipers, for-class programming HW/Projects, code malicious in nature, etc. Furthermore, applying Repositories must be owned by an applicate who is a **public** member of the VT GitHub Organization.

---
Have questions? Contact us, at <github-g@vt.edu>.
{: style="text-align: center;"} 
---


<b>Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="name" placeholder="" id="name_field"><br><br>
<b>GitHub Username</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="github_username" placeholder="" id="username_field"><br><br>
<b>Repository Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="repository_name" placeholder="" id="repository_field"><br><br>
<b>Description</b><font size="2.5rem"> (required)</font>
<textarea class="rounded" rows="4" cols="40" name="description" id="description_field" placeholder="" style="min-height:10rem;min-width:28rem"></textarea>
<b>Opensource license</b><br>
<input class="rounded" name="license" placeholder="" id="license_field"><br><br>
By clicking Send you validate that this repository does not violate the Virginia Tech [Policies](http://www.policies.vt.edu/index.php) nor [Honor Code](http://honorsystem.vt.edu/HSConstitution/honor_code_manual_and_policy.html).
{:text-align=center;}
<input type="submit" value="Send" onclick="sendRepoReq()"><br><br>

<a style="text-decoration: none" class="" name="send_message" id="send_message"><a/><br>


<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/javascript/verifyApplyFields.js"></script>
<script type="text/javascript" src="assets/javascript/sendFunction.js"></script>

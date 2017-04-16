---
layout: content
permalink: /featured_repos
---

# **Featured Repositories**
{:style="text-align: center;"}  
---

## **About Featured Repositories**  

Featured Repositories offer you the chance to get your Organization Repository in front of more people. Whether it be to find people to collaborate with or to simply show off your hard work, Featured Repositories offers the type of exposure you're looking for.  

---  

## **Perks of Featured Repositories**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1.** Repository is pinned to the top of the VT Organization website  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2.** Repository is showcased on the *Featured Repositories* section of the VT GitHub Pages website  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3.** Repository is tweeted about and pinned by our twitter account, [@VT_GitHub_Org](https://twitter.com/VT_GitHub_Org)  

Repositories will stay featured for a total of **10** days. Additional perks will be added as time progresses.  

Do you want a perk that isn't listed here? Tell us your idea, at <github-g@vt.edu>.

---  

## **Application Process**  
Featured Repository requests get submitted directly to the GitHub Coordinators for review. Typically, if any application fields are not sufficiently filled, that Repository's application will not be considered.  

To be clear, the same Repository ***can*** apply for a Featured Repository position multiple times. The only two restrictions to applying is that you cannot submit for a Featured Repository spot if you currently occupy one and that applying Repositories must be public in the Organization. We also ask that you do not submit an application if one is already pending, but we understand that accidents can happen.  

Consider that Repository content on the VT Organization can range from personal Python projects, to informative Java coding problem sets, to ongoing research projects, and everything in between. Also consider that the GitHub Coordinators may not know your projects language/architecture/etc. When applying for a Featured Repository position, keep these things in mind but do not hesitate to make your Repository sound as awesome as it can - because ultimately, that will be the primary aspect in determining Featured Repositories. Most applications will be reviewed and replied to in a week's time or less.  

---  

## **Apply to Feature your Repository**

<b>Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="name" placeholder="" id="name_field"><br><br>
<b>Contact Email</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="contact_email" placeholder="" id="email_field"><br><br>
<b>GitHub Username</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="github_name" placeholder="" id="username_field"><br><br>
<b>Repository Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" name="repo_name" placeholder="" id="repository_field"><br><br>
<b>Repository Description</b><font size="2.5rem"> (required)</font>
<textarea class="rounded" name="description" id="description_field" placeholder="" style="min-height:14rem;min-width:16rem"></textarea>
<b>Opensource license</b><br>
<input class="rounded" name="license" placeholder="N/A if none" id="license_field"><br><br>
<b>Additional Notes</b>
<textarea class="rounded" name="description" id="notes_field" placeholder="" style="min-height:10rem;min-width:16rem;"></textarea>
<!-- <div class="g-recaptcha" data-sitekey="6LcKlhcUAAAAAACUoRI5vsV3194GDQAMscIP_bC3" disabled></div><br> -->
<input type="submit" value="Send" onclick="sendFeaturedReq()"><br><br>
<a style="text-decoration: none" class="" name="req_message" id="req_message"></a><br>

<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>

<script type="text/javascript" src="assets/javascript/sendFunction.js"></script>
<script type="text/javascript" src="assets/javascript/verifyFields.js"></script>
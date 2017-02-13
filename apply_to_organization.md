---
layout: content
permalink: /apply_to_organization
---
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

<b>Email</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="username" name="email_field" placeholder="" id="email_field" required>@vt.edu<br><br>
<b>GitHub Username</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="username" name="username" placeholder="" id="username_field" required><br><br>	
<input type="submit" value="Apply" onclick="tempFunc();"><br><br>

<a style="text-decoration: none" class="" name="apply_message" id="apply_message"><a/>

<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/javascript/applyFunction.js"></script>
<script type="text/javascript" src="assets/javascript/verifyApplyFields.js"></script>
<script type="text/javascript">
       getUserVal();
</script>
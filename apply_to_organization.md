---
layout: content
permalink: /apply_to_organization
---

<b>Email</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="username" name="_replyto" placeholder="" id="email_field" required>@vt.edu<br><br>
<b>GitHub Username</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="username" name="subject" placeholder="" id="username_field" required><br><br>	
<input type="submit" value="Apply" onclick="tempFunc();">
<input type="hidden" name="_next" value="{{ site.baseurl }}{% link submit_success.md %}" />

<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/javascript/temp.js"></script>
<script type="text/javascript" src="assets/javascript/verifyUsername.js"></script>
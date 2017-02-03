---
layout: content
permalink: /add_repository
---

<b>Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="name" name="name" placeholder="" id="name_field" required><br><br>
<b>GitHub Username</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="github_username" name="github_username" placeholder="" id="username_field" required><br><br>
<b>Repository Name</b> <font size="2.5rem"> (required) </font><br>
<input class="rounded" type="subject" name="repository_name" placeholder="" id="repository_field" required><br><br>
<b>Description</b><font size="2.5rem"> (required)</font>
<textarea class="rounded" rows="4" cols="40" name="description" id="description_field" placeholder="Describe your repository and it's functionality briefly, but fully"></textarea>
<b>Opensource license</b><br>
<input class="rounded" type="license" name="license" placeholder="" id="license_field"><br><br>
<input type="submit" value="Send">
<input type="hidden" name="_next" value="{{ site.baseurl }}{% link submit_success.md %}" />
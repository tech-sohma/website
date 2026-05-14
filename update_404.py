import re

with open('index.html', 'r') as f:
    content = f.read()

header_part = content.split('<!-- HERO -->')[0]
footer_part = content.split('</div>\n\n<footer class="sohma-footer">')[1]

error_content = """<!-- 404 HERO -->
  <section class="sohma-hero" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; text-align: center;">
    <div class="sohma-wrap">
      <div style="position: relative; z-index: 2;">
        <div class="sohma-kicker">Error 404</div>
        <h1 class="sohma-h1" style="max-width: 100%; margin-left: auto; margin-right: auto;">Page Not Found</h1>
        <p class="sohma-subheadline" style="max-width: 600px; margin-left: auto; margin-right: auto;">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div class="sohma-ctaRow" style="justify-content: center;">
          <a class="sohma-btn sohma-btn--primary" href="index.html">Return to Homepage</a>
        </div>
      </div>
      
      <div class="sohma-visual" aria-hidden="true" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; pointer-events: none;">
        <div class="sohma-wave-wrap" style="opacity: 0.6;">
          <div class="sohma-wave sohma-wave--four" style="right: 50%; top: 10%; transform: translateX(50%);"></div>
          <div class="sohma-wave sohma-wave--five" style="right: 50%; top: 20%; transform: translateX(50%);"></div>
          <div class="sohma-wave sohma-wave--one" style="right: 50%; top: 30%; transform: translateX(50%) rotate(-18deg);"></div>
        </div>
      </div>
    </div>
  </section>

</div>

<footer class="sohma-footer">"""

new_content = header_part + error_content + footer_part

with open('404.html', 'w') as f:
    f.write(new_content)

print("404.html created successfully.")

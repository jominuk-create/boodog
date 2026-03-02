import React, { useEffect } from 'react';

interface DisqusCommentsProps {
  url: string;
  identifier: string;
  title: string;
}

const DisqusComments: React.FC<DisqusCommentsProps> = ({ url, identifier, title }) => {
  useEffect(() => {
    // @ts-expect-error: DISQUS is a global variable from the Disqus script
    if (window.DISQUS) {
      // @ts-expect-error: DISQUS is a global variable from the Disqus script
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = identifier;
          this.page.url = url;
          this.page.title = title;
        }
      });
    } else {
      // @ts-expect-error: disqus_config is a global variable for Disqus
      window.disqus_config = function (this: { page: { url: string; identifier: string; title: string } }) {
        this.page.url = url;
        this.page.identifier = identifier;
        this.page.title = title;
      };

      const d = document;
      const s = d.createElement('script');
      s.src = 'https://bbodog.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    }
  }, [url, identifier, title]);

  return (
    <div id="disqus_thread" className="mt-8 pt-8 border-t border-slate-100">
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusComments;

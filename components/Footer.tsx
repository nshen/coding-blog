import React from 'react'


const Footer = () => {
  return (
    <footer className="text-center py-20 leading-10 tracking-wider font-thin  text-gray-800">
      <p>
        © 2004-2017 Nshen.net |{" "}
        <a href="/atom.xml" target="blank">
          Feed
        </a>{" "}
        |{" "}
        <a href="/sitemap.xml" target="blank">
          Sitemap
        </a>{" "}
        |{" "}
        <a href="/tags" target="blank">
          Tags
        </a>{" "}
        | <a href="/support">Support</a>
      </p>
      <p>
        本站由{" "}
        <a href="https://github.com/nshen/coding-blog" target="blank">
          CodingBlog
        </a>{" "}
        强力构建，最后生成于 2021年12月24日上午9点24分 。
      </p>
      <p>
        「
        <a href="https://webify.cloudbase.net/" target="blank">
          CloudBase Webify{" "}
        </a>
        提供网站托管服务」
      </p>
    </footer>
  )
}

export default Footer

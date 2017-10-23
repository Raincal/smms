import React from 'react'

import styles from './About.less'
import MainLayout from '../components/layout'

const About = ({ location }) => (
  <MainLayout location={location}>
    <div className={styles.about}>
      <h1>本站基于 SM.MS API 制作</h1>
      <p>在法律允许范围内，请随意使用本图床。</p>
      <h2>严禁上传及分享如下类型的图片：</h2>
      <ul>
        <li>含有色情、暴力、宣扬恐怖主义的图片</li>
        <li>侵犯版权、未经授权的图片</li>
        <li>其他违反中华人民共和国法律的图片</li>
        <li>其他违反香港法律的图片</li>
      </ul>
    </div>
  </MainLayout>
  )

export default About

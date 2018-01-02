---
title: '[面试总结之css篇] 浅谈行内元素与块元素'
date: 2018-01-02 14:28:37
tags: [css, 面试]
---
行内元素的padding、margin的显示效果？之前在开发过程中没有注意这些细节，在面试的时候，面试官有问道该类型的问题，结果因为对细节的不注意导致回答错误，现在特意整理出来。
<!-- more -->
## 行内元素是否具有盒子模型
  答： 行内元素同样具有盒子模型

  > 小贴士
  > 盒子模型： html文档中的每个元素都被描绘成矩形盒子，这些矩形盒子通过一个模型来描述其占用空间，这个模型称为盒模型。盒模型通过四个边界来描述：margin（外边距），border（边框），padding（内边距），content（内容区域）,盒模型是要把元素看成立体的，它确实有空间的属性
   ![盒子模型](1.jpg)
  > 盒模型的类型： 标准盒子模型（元素的width和height = content）、IE盒子模型（元素的width和height =( content+border+padding )）
  > 解决跨浏览器方案：`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

## 行内元素的padding、margin是否无效？
  答：
    + 行内元素的padding-top/margin-top/padding-bottom/margin-bottom设置无效
    + 行内元素的padding-left/margin-left/padding-right/margin-right设置有效
    + 行内元素的padding-top/padding-bottom 从显示效果上是增加，但并不会对其他元素产生任何影响
   ```python
        <head>
			<style>	
			   span{
			   	  padding: 112px 0;
			   }
			</style>
        </head>
		<body>
			<p>深圳赛区区域组委会</p>
            <span>获取当赛区帮助和赛前指导，<i class="red">前往免费领取</i></span>
		</body>
   ```
   结果显示为：
   ![结果](2.png)

   观察上面的图,span的padding-top与padding-bottom的值为112px，审查元素的时候是可以看到，但是他并没有对其他元素产生影响
   span的左右内边距是产生了效果
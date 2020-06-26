#!/usr/bin/env node

console.log('hello cli')

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
])
.then(anwsers => {
  // console.log(anwsers)
  // 根据用户回答的结果生成文件

  // 模板目录
  const tmplDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()

  // 将模板下的文件全部转换到目标目录
  fs.readdir(tmplDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      console.log(file)
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmplDir, file), anwsers, (err, result) => {
        if (err) throw err

        // 将结果写入目标文件路径
        console.log(result)
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
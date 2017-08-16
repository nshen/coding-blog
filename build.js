const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const more = require('metalsmith-more');
const permalinks = require('metalsmith-permalinks');
const assets = require('metalsmith-assets');
const atomfeed = require('metalsmith-feed-atom');
const sitemap = require('metalsmith-sitemap');

const fs = require('fs-extra');
const path = require('path');

const moment = require('moment');
moment.locale('zh-cn');
const slug = require('slug');

var Handlebars = require('handlebars');

// header footer 模板
Handlebars.registerPartial({
    'footer': fs.readFileSync('./layouts/partials/footer.hbs').toString()
});
Handlebars.registerPartial({
    'header': fs.readFileSync('./layouts/partials/header.hbs').toString()
});


// tag button helper
// {{tags_button this.tags "tag_button"}}
Handlebars.registerHelper('tags_button', (tags, tagClass) => {
    // let str = "<div id = 'tags'>";
    let str = "";
    if (typeof tags === "string") {
        tags = tags.split(',');
    }

    for (let i in tags) {
        str += ` <a title="${tags[i]}" class="${tagClass}" href="/tags/#${tags[i]}">${tags[i]}</a>`
    }
    // str += "</div>"

    return new Handlebars.SafeString(str);
    // <a class="pure-button" href="#">A Pure Button</a>
})

Handlebars.registerHelper('formatDate', function(context, block) {
    var f = "LL";
    var result = "发表于 " + moment(context).format(f);
    return result;
});

// 第一个运行的plugin
function initPlugin() {
    return function(files, metalsmith, done) {
        let f;
        for (var file in files) {
            f = files[file];
            // console.log(file)
            if (path.extname(file) === '.md') {
                f.basename = slug(path.basename(file, '.md')); // 写入文件名,作为url的一部分
                if (path.dirname(file) === ".")
                    f.identifier = f.basename;
                else
                    f.identifier = slug(path.dirname(file) + '-' + f.basename); // 唯一标识，给diqus评论系统用 like: article-as3-to-typescript

                f.lastmod = files[file].date; // use in sitemap
            } else {
                // 非 md文件不处理
                delete files[file];

                // fs.copy(path.join('./src/posts', file), path.join('./build/', file), err => {
                //     console.log(err);
                // })
            }
        }
        done()
    }
}

// 自写的 tag plugin ，放在一页里
function tags() {
    return function(files, metalsmith, done) {
        let f;
        let tagMap = {};
        for (var file in files) {
            f = files[file];
            // tags
            if (f.tags) {
                if (typeof(f.tags) === "string") {
                    f.tags = f.tags.split(',');
                }
                f.tags.forEach(function(tag) {
                    if (!tagMap[tag]) {
                        tagMap[tag] = [];
                    }
                    tagMap[tag].push(f);

                }, this);
            }
        }
        let m = metalsmith.metadata();
        m.tagMap = tagMap;
        metalsmith.metadata(m);
        done()
    }
}

const config = {

    title: "CodingBlog",
    description: "一个程序员专用的私房极简静态博客系统",
    tags: "独立博客，静态博客，Markdown博客",
    author: "Nshen <nshen121@gmail.com>",
    url: "http://nshen.net/",
    updated: new Date().toISOString(),
    buildTime: String(moment().format('LLL'))
}


console.log("开始构建，请稍后...");

const metalsmith = Metalsmith(__dirname);
metalsmith.metadata({ site: config })
    .source('./src/posts')
    .destination('./build')
    .use(initPlugin())
    .use(collections({
        articles: {
            pattern: 'article/*.md',
            sortBy: 'date',
            reverse: true
        },
        projects: {
            pattern: 'project/*.md',
            sortBy: 'date',
            reverse: true
        },
        all: {
            pattern: '*/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(markdown({
        gfm: true,
        breaks: true,
        langPrefix: 'language-' // prism.js 需要前缀

    }))
    .use(more({ ext: 'html' }))
    .use(permalinks({ pattern: ':categories/:date/:basename', date: 'YYYY-MM-DD', relative: true }))
    .use(tags())
    .use(layouts({ engine: 'handlebars', default: 'article.hbs', rename: true }))
    // 拷贝素材目录
    .use(assets({
        source: './src/assets', // relative to the root directory
        destination: './assets' // relative to the build directory
    }))
    .use(assets({
        source: './src/image',
        destination: './image'
    }))
    .use(assets({
        source: './src/copy2root',
        destination: './'
    }))
    .use(atomfeed({ collection: 'all', limit: 20, destination: 'atom.xml', metadata: config }))
    .use(sitemap({ hostname: config.url, changefreq: 'weekly', priority: 0.5 }))
    .build((err, files) => {
        if (err) {
            console.log(err);
        }
        console.log("完成构建！");
    });
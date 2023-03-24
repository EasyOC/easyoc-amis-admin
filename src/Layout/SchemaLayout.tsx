import {Button} from 'amis-ui';
import React from 'react';
export default {
  type: 'app',
  // brandName: 'JiZhouSoft',
  // logo: '<svg t="1610181550507" style="color:#fff;width: 30px; height: 30px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2528" width="200" height="200"><path d="M217.090828 534.490224c99.683327-20.926612 86.12145-137.343041 83.128279-162.838715-4.906753-39.223327-52.112891-107.812471-116.217908-102.372575-80.693834 7.058766-92.487438 120.948653-92.487438 120.948653C80.583828 442.927855 117.654119 555.449581 217.090828 534.490224L217.090828 534.490224zM322.936505 737.004567c-2.907213 8.211009-9.413394 29.170366-3.781116 47.381124 11.123338 40.874943 51.108005 34.208103 51.108005 34.208103l56.034201 0L426.297594 706.525392l-56.034201 0C345.158622 713.864544 325.65543 728.85291 322.936505 737.004567L322.936505 737.004567zM402.144498 339.233168c55.081503 0 99.57588-61.946864 99.57588-138.461515 0-76.491115-44.494377-138.40728-99.57588-138.40728-54.974056 0-99.599416 61.916165-99.599416 138.40728C302.545082 277.286304 347.170442 339.233168 402.144498 339.233168L402.144498 339.233168zM639.288546 348.395852c73.635067 9.331529 120.925117-67.407226 130.340557-125.57195 9.582239-58.081837-37.906332-125.577067-90.024339-137.174196-52.219315-11.712763-117.390617 70.044286-123.329886 123.305327C549.187459 274.094612 565.853024 339.149257 639.288546 348.395852L639.288546 348.395852zM819.642171 690.38069c0 0-113.866351-86.12145-180.37716-179.167612-90.108251-137.176243-218.121809-81.367169-260.908288-11.604292C335.745229 569.372685 269.286608 613.477182 259.841491 625.187899c-9.552563 11.489682-137.50984 79.010495-109.128443 202.314799s135.49802 131.180691 135.49802 131.180691 66.203818-3.168156 151.517879-21.829168c85.312014-18.48705 158.833495 4.598738 158.833495 4.598738s199.320605 65.22349 253.866918-60.3546C904.897903 755.497757 819.642171 690.38069 819.642171 690.38069L819.642171 690.38069zM482.333842 874.629018 342.241176 874.629018c-55.946196-1.313925-71.552639-45.587268-74.354452-51.943023-2.777253-6.473435-18.606777-36.478819-10.226922-87.473237 24.179702-76.490092 84.613096-84.695984 84.613096-84.695984l84.053348 0L426.326247 566.464449l56.036247 0 0 308.164568L482.333842 874.629018zM706.478831 874.629018l-140.090619 0c-55.16746-2.355651-56.124252-52.927443-56.124252-52.927443l0.086981-171.2155 56.037271 0L566.388213 790.57874c3.697205 15.438621 28.016077 28.015054 28.016077 28.015054l56.037271 0L650.441561 650.486074l56.038294 0L706.479855 874.629018 706.478831 874.629018zM931.037237 446.066335c0-27.816532-23.675212-111.617124-111.395066-111.617124-87.919399 0-99.660814 79.093383-99.660814 135.016043 0 53.344952 4.592598 127.816061 113.806999 125.490086C943.00071 592.633459 931.037237 474.058876 931.037237 446.066335L931.037237 446.066335zM931.037237 446.066335" p-id="2529"></path></svg>',
  header: {
    type: 'myCustom',
    asFormItem: false,
    children: () => (
      <>
        <div className="w-full flex justify-between">
          <div>顶部区域左侧</div>
          <div>image.png</div>
        </div>
      </>
    )
  },
  // header: {
  //   type: 'tpl',
  //   inline: false,
  //   className: 'w-full',
  //   tpl: '<div class="flex justify-between"><div>顶部区域左侧</div><div>顶部区域右侧</div></div>'
  // },
  // footer:
  //   '<div class="p-2 text-center bg-light"> Copyrigt © 2021-2023 JizhouSoft Co., LTD. All rights reserved.</div>',
  // asideBefore: '<div class="p-2 text-center">菜单前面区域</div>',
  // asideAfter: '<div class="p-2 text-center">菜单后面区域</div>',
  pages: [
    {
      label: 'Home',
      url: '/',
      redirect: '/pageA'
    },
    {
      label: '示例',
      children: [
        {
          label: '页面A',
          url: 'pageA',
          schema: {
            type: 'page',
            title: '页面A',
            body: '页面A'
          },

          children: [
            {
              label: '页面A-1',
              url: '1',
              schema: {
                type: 'page',
                title: '页面A-1',
                body: '页面A-1'
              }
            },

            {
              label: '页面A-2',
              url: '2',
              schemaId: '123124',
              schema: {
                type: 'page',
                title: '页面A-2',
                body: '页面A-2'
              }
            },

            {
              label: '页面A-3',
              url: '3',
              schema: {
                type: 'page',
                title: '页面A-3',
                body: '页面A-3'
              }
            }
          ]
        },

        {
          label: '页面B',
          schema: {
            type: 'page',
            title: '页面B',
            body: '页面B'
          }
        },

        {
          label: '页面C',
          schema: {
            type: 'page',
            title: '页面C',
            body: '页面C'
          }
        },

        {
          label: '表单',
          url: '/form',
          icon: 'fa fa-plus',
          schemaApi: '/api/mock2/service/schema?type=form'
        },
        {
          label: '列表',
          url: '/crud/list',
          icon: 'fa fa-list',
          schemaApi: '/api/mock2/service/schema?type=crud'
        }
      ]
    },

    {
      label: '分组2',
      children: [
        {
          label: '用户管理',
          schema: {
            type: 'page',
            title: '用户管理',
            body: '页面C'
          }
        },

        {
          label: '外部链接',
          link: 'http://baidu.gitee.io/amis'
        },

        {
          label: '部门管理',
          schemaApi: '/api/mock2/service/form?tpl=tpl3'
        }
      ]
    }

    // {
    //   label: '404',
    //   visible: false,
    //   isDefaultPage: true,
    //   schema: {
    //     type: 'page',
    //     body: '自定义 404 页面，可以不配置'
    //   }
    // }
  ]
};

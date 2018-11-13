const edit_form = (req, res) => {
  console.log(req.body)
  res.end('edit_form')
}

const get_form = (req, res) => {
  res.send({
    success: true,
    data: {
      fixed: [
        {
          name: '姓名',
          type: 'text',
          length: 10,
          required: true,
          regex: ''
        },
        {
          name: '手机',
          type: 'number',
          length: 11,
          required: true,
          regex: 'phone'
        },
        {
          name: '性别',
          type: 'radio',
          length: 10,
          required: true,
          options: [
            {
              value: 0,
              label: '男'
            },
            {
              value: 1,
              label: '女'
            }
          ],
          regex: ''
        }
      ],
      custom: [
        {
          name: '备注',
          type: 'textArea',
          length: 100,
          required: true,
          regex: ''
        },
        {
          name: '爱好',
          type: 'checkbox',
          length: 3,
          required: true,
          options: [
             {
              value: 0,
              label: '打篮球'
            },
            {
              value: 1,
              label: '看电影'
            },
            {
              value: 2,
              label: '跑步'
            },
            {
              value: 3,
              label: '游泳'
            }
          ],
          regex: ''
        }
      ]
    }
  })
}

module.exports = { edit_form, get_form }

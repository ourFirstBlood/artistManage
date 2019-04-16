import React, { Component } from 'react'
import { Loading, Button, MessageBox } from 'element-react'
import ajaxReq from '../../common/ajaxReq'
import Set from '../set/Set'
import msg from '../../common/msg'
import './form.scss'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      hisCustomForm: [],
      hisFixForm: [],
      showForm: [],
      fixForm: [],
      translation: {
        text: '单行文本',
        radio: '单选框',
        textarea: '多行文本',
        checkbox: '多选框',
        date: '日期'
      },
      isShowSet: false,
      isShow: false,
      index: -1,
      save: false
    }
  }

  //设置表单数据--展示
  setForm = (data, isShow) => {
    return data.map((val, index) => {
      return (
        <li
          key={index}
          className={
            this.state.save &&
            this.state.index === index &&
            this.state.isShow === isShow
              ? 'form-cnt line'
              : 'form-cnt'
          }
        >
          <span>{index + 1}</span>
          <span>{val.name}</span>
          <span>{this.state.translation[val.type]}</span>
          <span className="operate">
            <em onClick={this.setShowSet.bind(this, index, isShow)}>编辑</em>
            <em onClick={this.handleDel.bind(this, index, isShow)}>删除</em>
            <em onClick={this.handleUp.bind(this, index, isShow)}>上移</em>
            <em onClick={this.handleDown.bind(this, index, isShow)}>下移</em>
          </span>
        </li>
      )
    })
  }
  //上移
  handleUp = (index, isShow) => {
    if (index === 0) return
    if (isShow) {
      const showForm = this.state.showForm
      ;[showForm[index], showForm[index - 1]] = [
        showForm[index - 1],
        showForm[index]
      ]
      this.setState({ showForm })
    } else {
      const fixForm = this.state.fixForm
      ;[fixForm[index], fixForm[index - 1]] = [
        fixForm[index - 1],
        fixForm[index]
      ]
      this.setState({ fixForm })
    }
    this.setState({ save: true, index: index - 1, isShow })
  }
  //下移
  handleDown = (index, isShow) => {
    if (isShow) {
      const showForm = this.state.showForm
      if (index === showForm.length - 1) return
      ;[showForm[index], showForm[index + 1]] = [
        showForm[index + 1],
        showForm[index]
      ]
      this.setState({ showForm })
    } else {
      const fixForm = this.state.fixForm
      if (index === fixForm.length - 1) return
      ;[fixForm[index], fixForm[index + 1]] = [
        fixForm[index + 1],
        fixForm[index]
      ]
      this.setState({ fixForm })
    }
    this.setState({ save: true, index: index + 1, isShow })
  }
  //删除
  handleDel = (index, isShow) => {
    const showForm = this.state.showForm,
      fixForm = this.state.fixForm
    isShow ? showForm.splice(index, 1) : fixForm.splice(index, 1)
    this.setState({ showForm, fixForm, save: true })
  }
  //设置表单  添加 修改
  setShowSet = (data, isShow) => {
    // true时接收data 为新数据或修改的数据 （接收子组件传来的内容）
    if (this.state.isShowSet) {
      if (isShow) {
        //判断是否是确认
        if (data.sign === 'custom') {
          const showForm = this.state.showForm
          this.state.index === -1
            ? showForm.push(data)
            : (showForm[this.state.index] = data)
          this.setState({ showForm })
        } else {
          const fixForm = this.state.fixForm
          this.state.index === -1
            ? fixForm.push(data)
            : (fixForm[this.state.index] = data)
          this.setState({ fixForm })
        }
        this.setState({ save: true })
      }
      this.setState({
        isShowSet: false
      })
    } else {
      //false 时接收的data 表示的是index数据   （操作的父组件）
      // 编辑数组时设置传递的数据
      const x =
        data === -1
          ? {}
          : isShow
          ? JSON.parse(JSON.stringify(this.state.showForm[data]))
          : JSON.parse(JSON.stringify(this.state.fixForm[data]))
      this.setState({
        index: data,
        data: x,
        isShowSet: !this.state.isShowSet,
        isShow //设置是否编辑的是展示字段
      })
    }
  }
  //保存
  handleSave = () => {
    MessageBox.confirm('是否确定保存该表单？', '提示', {
      type: 'warning'
    })
      .then(() => {
        this.setState({ loading: true })
        ajaxReq
          .call(this, {
            url: '/power/form/edit_form',
            params: {
              custom: JSON.stringify(this.state.showForm),
              fixed: JSON.stringify(this.state.fixForm)
            }
          })
          .then(() => {
            msg('保存成功！')
            this.setState({
              loading: false,
              save: false,
              index: -1,
              hisCustomForm: JSON.parse(JSON.stringify(this.state.showForm)),
              hisFixForm: JSON.parse(JSON.stringify(this.state.fixForm))
            })
          })
      })
      .catch(() => {
        msg('您已经终止了保存操作！')
      })
  }
  //取消
  handleCancel = () => {
    this.setState({
      index: -1,
      save: false,
      showForm: JSON.parse(JSON.stringify(this.state.hisCustomForm)),
      fixForm: JSON.parse(JSON.stringify(this.state.hisFixForm))
    })
  }
  //请求表单数据
  componentDidMount() {
    ajaxReq
      .call(this, {
        url: '/power/form/get_form'
      })
      .then(res => {
        this.setState({
          loading: false,
          showForm: res.data.custom,
          fixForm: res.data.fixed,
          hisCustomForm: JSON.parse(JSON.stringify(res.data.custom)),
          hisFixForm: JSON.parse(JSON.stringify(res.data.fixed))
        })
      })
  }
  render() {
    return (
      <div className="form">
        <Loading
          loading={this.state.loading}
          style={{ width: '100%', height: '100%', minWidth: '900px' }}
          text="拼命加载中"
        >
          <div className="form-layout">
            <div className="form-name">固定字段</div>
            <div className="form-props">
              <span>序号</span>
              <span>字段名</span>
              <span>类别</span>
              <span className="operate">操作</span>
            </div>
            <ul>{this.setForm(this.state.showForm, true)}</ul>
            <div className="form-name">展示字段</div>
            <ul>{this.setForm(this.state.fixForm, false)}</ul>
          </div>
          <span onClick={this.setShowSet.bind(this, -1)} className="add-form">
            <i className="el-icon-plus" />
          </span>
          {this.state.save ? (
            <div className="form-btn">
              <Button onClick={this.handleCancel}>取消</Button>
              <Button onClick={this.handleSave}>保存</Button>
            </div>
          ) : null}
        </Loading>
        {this.state.isShowSet ? (
          <Set data={this.state.data} show={this.setShowSet} />
        ) : null}
      </div>
    )
  }
}

export default Form

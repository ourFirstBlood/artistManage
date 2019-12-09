import React, { Component } from "react";
import ajaxReq from "../../common/ajaxReq";
import msg from "../../common/msg";
import "./index.scss";
import {
  Loading,
  Table,
  Button,
  Dialog,
  Input,
  Form,
  MessageBox,
  Upload
} from "element-react";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 20,
      name: "",
      pid: "",
      params: {
        id: "",
        name: "",
        income: ""
      },
      columns: [
        {
          type: "index"
        },
        {
          label: "名字",
          prop: "name",
          render: function(data) {
            return <span>{data.name || "--"}</span>;
          }
        },
        {
          label: "收入",
          prop: "income",
          width: 160
        },
        {
          label: "操作",
          prop: "address",
          render: item => {
            return (
              <span>
                <Button
                  type="primary"
                  size="small"
                  onClick={this.openDialog.bind(this, item)}
                >
                  编辑
                </Button>
                <Button
                  onClick={this.deleteItem.bind(this, item)}
                  type="danger"
                  size="small"
                >
                  删除
                </Button>
              </span>
            );
          }
        }
      ],
      data: [],
      count: 0,
      loading: true,
      dialogVisible: false,
      excelDialogVisible: false,
      fileList: []
    };
  }

  importExcel() {
    this.setState({
      excelDialogVisible: true
    });
  }

  comfirmImport() {
    this.setState({
      excelDialogVisible: true
    });
  }

  uploadChange(file) {
    if (file.response.code !== 0) {
      msg(file.name + "导入失败 :" + file.response.msg, false, 10000);
    } else {
      msg(file.name + "导入成功");
      this.getList();
      let { fileList } = this.state;
      fileList.push(file);
      this.setState({
        fileList
      });
    }
  }

  openDialog({ id = 0, name = "", income }) {
    const params = {
      id,
      name,
      income
    };
    this.setState({ params, dialogVisible: true });
  }

  async deleteItem({ user_name, name, id }) {
    await MessageBox.confirm(`确定要删除？`, "提示", {
      type: "warning"
    });
    this.setState({ loading: true });
    ajaxReq
      .call(this, {
        url: "/wage/delete",
        params: {
          id: [id]
        }
      })
      .then(() => {
        msg("删除成功");
        this.setState({ dialogVisible: false });
        this.getList();
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false });
      });
  }

  getList(initId) {
    this.setState({ loading: true });
    const { pid, page, page_size, name } = this.state;
    ajaxReq
      .call(this, {
        url: "/wage/get_list",
        params: { pid: initId || pid, page, page_size, name }
      })
      .then(res => {
        const { list, count } = res.data;
        this.setState({
          data: list,
          count,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false });
      });
  }

  addAccount = () => {
    let { pid } = this.state;
    let { name, income, id } = this.state.params;
    if (!name.trim()) {
      msg("请输入姓名", false);
      return;
    }
    if (!income || income <= 0) {
      msg("收入的格式错误", false);
      return;
    }
    this.setState({ loading: true });
    ajaxReq
      .call(this, {
        url: "/wage/add",
        params: {
          pid,
          name,
          id,
          income
        }
      })
      .then(() => {
        if (id === "0") {
          msg("成功");
        } else {
          msg("修改成功");
        }
        this.setState({ dialogVisible: false });
        this.getList();
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false });
      });
  };
  componentWillMount() {
    const id = this.props.match.params.id;
    this.setState({ pid: id });
    this.getList(id);
  }
  render() {
    return (
      <div className="account wage-content">
        <Loading loading={this.state.loading}>
          <div className="head">
            <Button
              icon="arrow-left"
              onClick={() => {
                this.props.history.go(-1);
              }}
            >
              返回
            </Button>
            <div className="center">
              <Input
                value={this.state.name}
                placeholder="输入姓名"
                onChange={value => {
                  this.setState({
                    name: value
                  });
                }}
              ></Input>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon="edit"
                onClick={this.openDialog.bind(this)}
              >
                新建数据
              </Button>
              <Button icon="upload" onClick={this.importExcel.bind(this)}>
                导入
              </Button>
            </div>
          </div>

          <Table
            style={{ width: "100%" }}
            columns={this.state.columns}
            data={this.state.data}
            border={true}
            highlightCurrentRow={true}
          />
          <Dialog
            className="add-info"
            title={this.state.params.id ? "修改资料" : "新增资料"}
            visible={this.state.dialogVisible}
            closeOnClickModal={false}
            onCancel={() => this.setState({ dialogVisible: false })}
          >
            <Loading loading={this.state.loading && this.state.dialogVisible}>
              <Dialog.Body>
                <Form labelWidth="80">
                  <Form.Item label="姓名">
                    <Input
                      value={this.state.params.name}
                      onChange={value => {
                        this.setState({
                          params: { ...this.state.params, name: value }
                        });
                      }}
                    ></Input>
                  </Form.Item>
                  <Form.Item label="收入">
                    <Input
                      type="number"
                      value={this.state.params.income}
                      onChange={value => {
                        this.setState({
                          params: { ...this.state.params, income: value }
                        });
                      }}
                    ></Input>
                  </Form.Item>
                </Form>
              </Dialog.Body>

              <Dialog.Footer className="dialog-footer">
                <Button onClick={() => this.setState({ dialogVisible: false })}>
                  取 消
                </Button>
                <Button type="primary" onClick={this.addAccount.bind(this)}>
                  确 定
                </Button>
              </Dialog.Footer>
            </Loading>
          </Dialog>
          <Dialog
            title="导入表格"
            visible={this.state.excelDialogVisible}
            closeOnClickModal={false}
            onCancel={() => this.setState({ excelDialogVisible: false })}
          >
            <Loading
              loading={this.state.loading && this.state.excelDialogVisible}
            >
              <Dialog.Body>
                <Upload
                  className="upload-demo"
                  drag
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  data={{ pid: this.state.pid }}
                  action="/wage/import"
                  multiple
                  fileList={this.state.fileList}
                  onChange={this.uploadChange.bind(this)}
                  tip={<div className="el-upload__tip">只能上传excel文件</div>}
                >
                  <i className="el-icon-upload"></i>
                  <div className="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                </Upload>
              </Dialog.Body>
            </Loading>
          </Dialog>
        </Loading>
      </div>
    );
  }
}

export default Account;

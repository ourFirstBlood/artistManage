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
  Upload,
  Pagination
} from "element-react";

const source = {};
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 20,
      name: "",
      pid: "",
      type: 0,
      others: new Array(16),
      params: {
        id: "",
        name: "",
        income: ""
      },
      columns0: [
        {
          type: "selection"
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
          prop: "income"
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
                  onClick={this.deleteItem.bind(this, [item.id])}
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
      columns1: [
        {
          type: "selection"
        },
        {
          label: "月份",
          fixed: "left",
          render: function({ others }) {
            return <span>{others[0]}</span>;
          },
          width: "100"
        },
        {
          label: "播主昵称",
          fixed: "left",
          render: function({ others }) {
            return <span>{others[1]}</span>;
          },
          width: "120"
        },
        {
          label: "播主姓名",
          prop: "name",
          render: function({ others }) {
            return <span>{others[2]}</span>;
          },
          width: "100"
        },
        {
          label: "陌陌号",
          render: function({ others }) {
            return <span>{others[3]}</span>;
          },
          width: "140"
        },
        {
          label: "性别",
          render: function({ others }) {
            return <span>{others[4]}</span>;
          },
          width: "80"
        },
        {
          label: "播主等级",
          render: function({ others }) {
            return <span>{others[5]}</span>;
          },
          width: "100"
        },
        {
          label: "连麦陌币",
          render: function({ others }) {
            return <span>{others[6]}</span>;
          },
          width: "120"
        },
        {
          label: "非连麦陌币",
          render: function({ others }) {
            return <span>{others[7]}</span>;
          },
          width: "120"
        },
        {
          label: "总陌币",
          render: function({ others }) {
            return <span>{others[8]}</span>;
          },
          width: "120"
        },
        {
          label: "结算方式",
          render: function({ others }) {
            return <span>{others[9]}</span>;
          },
          width: "100"
        },
        {
          label: "播主分成金额(元)",
          render: function({ others }) {
            return <span>{others[10]}</span>;
          },
          width: "150"
        },
        {
          label: "播主奖励(元)",
          render: function({ others }) {
            return <span>{others[11]}</span>;
          },
          width: "200"
        },
        {
          label: "额外奖励(元)",
          render: function({ others }) {
            return <span>{others[12]}</span>;
          },
          width: "200"
        },
        {
          label: "个税",
          render: function({ others }) {
            return <span>{others[13]}</span>;
          },
          width: "200"
        },
        {
          label: "到手工资",
          render: function({ others }) {
            return <span>{others[14]}</span>;
          },
          width: "200"
        },
        {
          label: "特殊情况",
          render: function({ others }) {
            return <span>{others[15]}</span>;
          },
          width: "200"
        },
        {
          label: "操作",
          prop: "address",
          width: "150",
          fixed: "right",
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
                  onClick={this.deleteItem.bind(this, [item.id])}
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
      selected: [],
      count: 0,
      loading: true,
      dialogVisible: false,
      excelDialogVisible: false
    };
  }

  importExcel() {
    this.setState({
      excelDialogVisible: true
    });
  }
  beforeUpload(file) {
    let index = file.name.lastIndexOf(".");
    const ext = file.name.slice(index + 1).toLowerCase();
    const include = ["xls", "xlsx"].includes(ext);
    if (!include) {
      msg("只能上传.xlsx 或 .xls格式的文件", false, 2000);
    }
    return include;
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
      msg(file.name + "导入成功", true, 3000);
      this.getList();
    }
  }

  openDialog({ id = 0, name = "", income, others: itemO }) {
    let { type, others } = this.state;
    const params = {
      id,
      name,
      income
    };
    if (type === 1) {
      others = itemO || new Array(16);
    }
    this.setState({ params, others, dialogVisible: true });
  }

  async deleteItem(ids) {
    await MessageBox.confirm(`确定要删除？`, "提示", {
      type: "warning"
    });
    this.setState({ loading: true });
    ajaxReq
      .call(this, {
        url: "/wage/delete",
        params: {
          id: ids
        }
      })
      .then(() => {
        msg("删除成功");
        this.setState({ dialogVisible: false, selected: [] }, this.getList);
      })
      .catch(() => {
        this.setState({ dialogVisible: false, loading: false });
      });
  }

  onSizeChange(page_size) {
    this.setState(
      {
        page_size
      },
      this.getList
    );
  }
  onCurrentChange(page) {
    this.setState(
      {
        page
      },
      this.getList
    );
  }

  getList(initId) {
    this.setState({ loading: true });
    const { pid, page, page_size, name } = this.state;
    if (source.cancel) source.cancel("cancel");
    ajaxReq
      .call(this, {
        url: "/wage/get_list",
        params: { pid: initId || pid, page, page_size, name },
        can: source
      })
      .then(res => {
        let { list, count, type } = res.data;
        if (type === 1) {
          list = list.map(item => {
            item.others = item.others.split(",");
            return item;
          });
        }
        this.setState({
          type,
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
    let { pid, type, others } = this.state;
    let { name, income, id } = this.state.params;
    if (type === 1) {
      name = others[2];
      income = others[10];
    }
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
          income,
          others: others
            .map(item => {
              if (typeof item === "undefined") {
                return "-";
              }
              return item;
            })
            .join(",")
        }
      })
      .then(() => {
        if (id === 0) {
          msg("新建成功");
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

  renderForm = () => {
    const { type, others, columns1 } = this.state;
    const { name, income } = this.state.params;
    if (type === 0) {
      return (
        <Form labelWidth="120">
          <Form.Item label="姓名">
            <Input
              placeholder="请输入姓名"
              value={name}
              onChange={value => {
                this.setState({
                  params: { ...this.state.params, name: value }
                });
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="收入">
            <Input
              placeholder="请输入收入"
              type="number"
              value={income}
              onChange={value => {
                this.setState({
                  params: { ...this.state.params, income: value }
                });
              }}
            ></Input>
          </Form.Item>
        </Form>
      );
    } else {
      const fields = columns1.slice(1, -1);
      return (
        <Form labelWidth="120">
          {fields.map((item, index) => (
            <Form.Item key={index} label={item.label}>
              <Input
                placeholder={"请输入" + item.label}
                value={others[index]}
                onChange={value => {
                  others[index] = value;
                  this.setState({
                    others
                  });
                }}
              />
            </Form.Item>
          ))}
        </Form>
      );
    }
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
            {this.state.selected.length ? (
              <Button
                onClick={this.deleteItem.bind(this, this.state.selected)}
                type="danger"
              >
                删除
              </Button>
            ) : null}
            <div className="center">
              <Input
                value={this.state.name}
                placeholder="输入姓名"
                onChange={value => {
                  this.setState(
                    {
                      name: value,
                      page: 1
                    },
                    this.getList
                  );
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

          <div className="table-container">
            <Table
              height="100%"
              columns={this.state["columns" + this.state.type]}
              data={this.state.data}
              border={true}
              highlightCurrentRow={true}
              onSelectChange={selection => {
                const selected = selection.map(item => item.id);
                this.setState({ selected });
              }}
            />
          </div>
          <div className="footer">
            <Pagination
              layout="total, sizes, prev, pager, next, jumper"
              total={this.state.count}
              pageSizes={[20, 50, 100]}
              pageSize={this.state.page_size}
              currentPage={this.state.page}
              onSizeChange={this.onSizeChange.bind(this)}
              onCurrentChange={this.onCurrentChange.bind(this)}
            />
          </div>
          <Dialog
            className="add-info"
            title={this.state.params.id ? "修改资料" : "新增资料"}
            visible={this.state.dialogVisible}
            closeOnClickModal={false}
            onCancel={() => this.setState({ dialogVisible: false })}
          >
            <Loading loading={this.state.loading && this.state.dialogVisible}>
              <Dialog.Body>{this.renderForm()}</Dialog.Body>

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
            className="import-dialog"
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
                  data={{ pid: this.state.pid, type: this.state.type }}
                  action="/wage/import"
                  multiple
                  beforeUpload={this.beforeUpload.bind(this)}
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

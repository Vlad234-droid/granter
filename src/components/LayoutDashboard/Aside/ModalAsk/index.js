import React from 'react';
import {Modal} from 'antd';
import './style.scss';
import AskPhoto from '../../../../assets/img/ask-photo.png';
import {Form, Select, Radio, Button} from 'antd';

const ModalAsk = ({visibleModal, handleOk, handleCancel}) => {
	const {Option} = Select;
	const checkValidBox = (e) => {
		console.log(e.length);
		if (e.length > 1) {
			e.shift();
		}
		//console.log(e.target.checked)
	};
	const formItemLayout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 14,
		},
	};
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};
	return (
		<>
			<Modal
				visible={visibleModal}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText="Back"
			>
				<Form
					{...formItemLayout}
					name="askForm"
					onFinish={onFinish}
					initialValues={{
						'input-number': 3,
						'checkbox-group': ['A', 'B'],
						rate: 3.5,
					}}
				>
					<div className="wrapper-info">
						<div className="info-img-text-info">
							<img src={AskPhoto} alt="Logo Photo" />
							<b>
								Have a Question? Our consultants are always on hand to help.
							</b>
							<p>
								Type your message and your consultant will respond to you on
								email.
							</p>
						</div>
						<textarea name="text" id="text" cols="30" rows="10"></textarea>
						<div className="checkBox">
							<h3>Receive answer by:</h3>
							<Form.Item name="radio-group" label="Radio.Group">
								<Radio.Group>
									<Radio value="a">item 1</Radio>
									<Radio value="b">item 2</Radio>
									<Radio value="c">item 3</Radio>
								</Radio.Group>
							</Form.Item>
						</div>
					</div>
					<Button type="primary" htmlType="submit">
						Ask
					</Button>
				</Form>
			</Modal>
		</>
	);
};

export default ModalAsk;

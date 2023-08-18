import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';


const data = [
    {
        "id": "71831e1f-9f93-40c8-ac2d-65d49d195141",
        "title": "Ewe",
        "created_at": "2023-08-18T11:48:41.59536Z",
        "updated_at": "2023-08-18T11:48:41.59536Z",
        "user_id": "82b26c81-c1f4-4e45-a23d-3e42c52e15ea"
    },
    {
        "id": "57639d8c-cfcc-425c-ad77-7daf696fc11d",
        "title": "Twi",
        "created_at": "2023-08-18T13:06:35.610311Z",
        "updated_at": "2023-08-18T13:06:35.610311Z",
        "user_id": "82b26c81-c1f4-4e45-a23d-3e42c52e15ea"
    }
    // Add more data entries as needed
];


const DynamicComponent = ({ data }) => {
    return (
        <div>
            <h2>Dynamic Fields</h2>
            {data.map((entry) => (
                entry.title && (
                    <div key={entry.id}>
                        <label>{entry.title}:</label>
                        <Field type="text" name={`message.${entry.id}`} />
                        <br />
                    </div>
                )
            ))}
        </div>
    );
};


const VoiceComponent = ({ data }) => {
    return (
        <div>
            <h2>Upload Voice Messages</h2>
            {data.map((entry) => (
                entry.title && (
                    <div key={entry.id}>
                        <label>{entry.title} Voice:</label>
                        <Field type="file" name={`voiceFile.${entry.id}`} />
                        <br />
                    </div>
                )
            ))}
        </div>
    );
};



const MyDynamicForm = () => {
    const [values, setValues] = useState({
        message_title: '',
        message: {},
        voiceFile: {},
        voiceTitle: {},
        selectedComponent: 'voice', // Default to 'text'
    });

    const handleVoiceModeToggle = (component) => {
        setValues((prevValues) => ({
            ...prevValues,
            selectedComponent: component,
        }));
    };


    const handleSubmit = async (values) => {
        try {
            if (values.selectedComponent === 'text') {
                console.log("Text")
                const requestData = {
                    title: values.message_title,
                    is_sms: true, // For text mode
                    is_voice: false,
                    content: Object.keys(values.message).map((langId) => ({
                        sms_content: values.message[langId],
                        msg_template_lang_id: langId,
                    })),
                };

                // Make the API request with JSON for text
                const response = await axios.post('http://localhost:9092/api/user/message-template/b8877783-f688-4950-bd06-f3522b1cffbf', requestData);
                console.log(response.data);
            } else if (values.selectedComponent === 'voice') {
                console.log("Voice")
                const formData = new FormData();

                // Add the voice files
                formData.append('title', values.message_title);
                Object.keys(values.voiceFile).forEach((entryId, index) => {
                    formData.append(`content[${index}][file]`, values.voiceFile[entryId]);
                    formData.append(`content[${index}][msg_template_lang_id]`, entryId);
                });

                // Make the API request with FormData for voice
                const response = await axios.post('http://localhost:9092/api/user/message-template/b8877783-f688-4950-bd06-f3522b1cffbf', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };




    return (
        <Formik initialValues={values} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <label>Message Title:</label>
                    <Field type="text" name="message_title" />
                    <br />
                </div>
                <div>
                    <button onClick={() => handleVoiceModeToggle('text')}>Text</button>
                    <button onClick={() => handleVoiceModeToggle('voice')}>Voice</button>

                </div>
                {values.selectedComponent === 'text' && (
                    <>
                        <DynamicComponent data={data} /> {/* Pass the data array */}
                    </>
                )}
                {values.selectedComponent === 'voice' && (
                    <>
                        <VoiceComponent data={data} /> {/* Pass the data array */}
                    </>
                )}
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default MyDynamicForm;

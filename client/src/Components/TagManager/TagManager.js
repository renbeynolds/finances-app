import { List, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFetchTags } from '../../Redux/Tags/actions';
import { selectTagsArray } from '../../Redux/Tags/selectors';

function TagManager() {

    const dispatch = useDispatch();
    const tags = useSelector(selectTagsArray);

    useEffect(() => {
        dispatch(requestFetchTags());
    }, [dispatch]);

    return (
        <List
            header={<div>Tags</div>}
            bordered
            dataSource={tags}
            renderItem={item => (
                <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item.name}
                </List.Item>
            )}
        />
    );
};

export default TagManager;
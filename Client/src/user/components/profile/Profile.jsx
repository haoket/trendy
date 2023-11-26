import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { uploadImage, updateImage } from '../../../utils/apiCalls';
import { apiDomain } from '../../../utils/utilsDomain';
import { Context } from '../../../context/Context';

export const Profile = () => {
    const [selectedImages, setSelectedImages] = useState('');
    const [uploadedImage, setUploadedImage] = useState('');
    const { pathname } = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = useContext(Context);
    const userId = user.id;

    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = 'order-waiting';
    }

    useEffect(() => {
        const img = user.img;
        setSelectedImages(img);
    }, [user.img]);

    const linkClasses = (type = null) => {
        let classes = ' inline-flex gap-1 px-2 px-6 py-1 ';
        if (type === subpage) {
            classes += ' bg-red-600 p-3 text-white ';
        }
        return classes;
    };

    const handleImageSelect = async (e) => {
        const files = e.target.files[0];

        if (files) {
            const formData = new FormData();
            formData.append('ImageLink', files);

            try {
                const response = await uploadImage(formData);
                console.log('Tải lên hình ảnh:', response.fileName);

                setUploadedImage(response.fileName);

                const data = {
                    uploadImage: response.fileName,
                };

                await updateImage(data, userId);
                setSelectedImages(response.fileName);
                dispatch({
                    type: "UPDATE_IMG",
                    payload: response.fileName,
                });
            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh: ', error);
            }

        }
        console.log('====================================');
        console.log("user", user);
        console.log('====================================');
    };

    return (
        <div className='px-40'>
            <div>
                <h1 className='font-bold text-xl'>Thông tin cá nhân</h1>
                <div className='flex flex-col justify-between mt-3 mb-10'>
                    {/* hiển thị và chỉnh sửa ảnh người dùng */}
                    <div className='py-5'>
                        <div className="m-1 relative" >
                            <img className='rounded-full border' src={apiDomain + "/image/" + selectedImages} width={200} height={200} />
                        </div>
                        <input type="file" id='avatar' hidden onChange={handleImageSelect} />
                        <label htmlFor="avatar" className='bg-[#ededed] text-[#666666] rounded-1xl cursor-pointer'>+ Thay đổi ảnh đại diện</label>
                        <h1 className='font-bold mt-4'>Tên khách hàng</h1>
                        <p>{user.name}</p>
                    </div>
                    <div className='flex justify-between border-2 rounder-2xl p-5'>
                        <div>
                            <h1 className='font-bold'>Địa chỉ email</h1>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h1 className='font-bold'>Địa chỉ Người dùng</h1>
                            <p>Thừa Thiên Huế</p>
                        </div>
                        <div>
                            <h1 className='font-bold'>Số điện thoại</h1>
                            <p>038917239817</p>
                        </div>
                        <p className='flex items-center p-2 bg-blue-200 text-white-600  rounded-1xl cursor-pointer '> + Sửa thông tin người dùng </p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='mt-10'>
                <h1 className='font-bold text-xl'>Đơn hàng của tôi</h1>
                <div className='flex justify-between mt-3 rounded-1xl pt-5'>
                    <div className={`${linkClasses('order-waiting')} font-bold text-xl`}><Link to="" value='1'>Đơn đang chờ xử lý</Link></div>
                    <div className={`${linkClasses('order-shiping')} font-bold text-xl`}><Link to="order-shiping">Đơn đang giao</Link></div>
                    <div className={`${linkClasses('order-success')} font-bold text-xl`} ><Link to="order-success">Đơn đã giao</Link></div>
                    <div className={`${linkClasses('order-cancel')} font-bold text-xl`}><Link to='order-cancel'>Đơn đã hủy</Link></div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
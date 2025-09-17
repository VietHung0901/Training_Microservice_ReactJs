package com.wisdom.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

@EqualsAndHashCode(callSuper = true)
@Data
public class ErrorHandler extends RuntimeException {

    /**
     * Trạng thái HTTP của lỗi.
     */
    private HttpStatus status;

    /**
     * Constructor để tạo một ngoại lệ với mã trạng thái HTTP và thông báo lỗi.
     *
     * @param status Mã trạng thái HTTP, ví dụ: HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST.
     * @param msg    Thông điệp mô tả lỗi.
     */
    public ErrorHandler(HttpStatus status, String msg) {
        super(msg);
        this.status = status;
    }
}
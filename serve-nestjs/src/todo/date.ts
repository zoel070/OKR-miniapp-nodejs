class DateFormatter {
  static formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }

  static formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return (
      [year, month, day].map(this.formatNumber).join('/') +
      ' ' +
      [hour, minute, second].map(this.formatNumber).join(':')
    );
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(this.formatNumber).join('/');
  }
}

export { DateFormatter };

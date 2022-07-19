FROM ubuntu

RUN apt clean
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y gcc g++ make git vim autoconf libssl-dev zlib1g-dev curl libcurl4-gnutls-dev libcrypto++-dev libzstd-dev libtool pkg-config
RUN git clone https://github.com/uroni/urbackup_backend
WORKDIR urbackup_backend
RUN ./switch_build.sh server
RUN autoupdate
RUN autoreconf --install
RUN ./configure
RUN make
RUN make install

PGDMP  )                    |         	   Proyecto2    16.1    16.1 _    #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            &           1262    41707 	   Proyecto2    DATABASE     �   CREATE DATABASE "Proyecto2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Proyecto2";
                postgres    false            �            1255    50371    encode_password_base64()    FUNCTION     �   CREATE FUNCTION public.encode_password_base64() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.contrasena := encode(convert_to(NEW.contrasena, 'UTF8'), 'base64');
    RETURN NEW;
END;
$$;
 /   DROP FUNCTION public.encode_password_base64();
       public          postgres    false            �            1259    42035    area    TABLE     ^   CREATE TABLE public.area (
    id_area integer NOT NULL,
    nombre character varying(255)
);
    DROP TABLE public.area;
       public         heap    postgres    false            �            1259    42034    area_id_area_seq    SEQUENCE     �   CREATE SEQUENCE public.area_id_area_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.area_id_area_seq;
       public          postgres    false    216            '           0    0    area_id_area_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.area_id_area_seq OWNED BY public.area.id_area;
          public          postgres    false    215            �            1259    42042    cliente    TABLE     �   CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nit character varying(255),
    nombre character varying(255),
    direccion character varying(255)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    42041    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          postgres    false    218            (           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    217            �            1259    42098    detallepedido    TABLE     �   CREATE TABLE public.detallepedido (
    id_detallepedido integer NOT NULL,
    id_pedido integer,
    id_item integer,
    cantidad integer,
    subtotal double precision
);
 !   DROP TABLE public.detallepedido;
       public         heap    postgres    false            �            1259    42097 "   detallepedido_id_detallepedido_seq    SEQUENCE     �   CREATE SEQUENCE public.detallepedido_id_detallepedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.detallepedido_id_detallepedido_seq;
       public          postgres    false    228            )           0    0 "   detallepedido_id_detallepedido_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.detallepedido_id_detallepedido_seq OWNED BY public.detallepedido.id_detallepedido;
          public          postgres    false    227            �            1259    42115    encuesta    TABLE     �   CREATE TABLE public.encuesta (
    id_encuesta integer NOT NULL,
    id_pedido integer,
    amabilidad_mesero integer,
    calidad_comida integer,
    exactitud_pedido integer
);
    DROP TABLE public.encuesta;
       public         heap    postgres    false            �            1259    42114    encuesta_id_encuesta_seq    SEQUENCE     �   CREATE SEQUENCE public.encuesta_id_encuesta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.encuesta_id_encuesta_seq;
       public          postgres    false    230            *           0    0    encuesta_id_encuesta_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.encuesta_id_encuesta_seq OWNED BY public.encuesta.id_encuesta;
          public          postgres    false    229            �            1259    42127    factura    TABLE     �   CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    id_pedido integer,
    fecha_hora_emision timestamp without time zone,
    total_sin_propina double precision,
    total_con_propina double precision,
    id_cliente integer
);
    DROP TABLE public.factura;
       public         heap    postgres    false            �            1259    42126    factura_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false    232            +           0    0    factura_id_factura_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;
          public          postgres    false    231            �            1259    42089    item    TABLE     �   CREATE TABLE public.item (
    id_item integer NOT NULL,
    nombre character varying(255),
    descripcion text,
    precio double precision,
    tipo character varying(255)
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    42088    item_id_item_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_item_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.item_id_item_seq;
       public          postgres    false    226            ,           0    0    item_id_item_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.item_id_item_seq OWNED BY public.item.id_item;
          public          postgres    false    225            �            1259    42060    mesa    TABLE     �   CREATE TABLE public.mesa (
    pk_mesa integer NOT NULL,
    id_mesa integer,
    id_area integer,
    personas_mesa integer,
    es_para_fumadores boolean
);
    DROP TABLE public.mesa;
       public         heap    postgres    false            �            1259    42059    mesa_pk_mesa_seq    SEQUENCE     �   CREATE SEQUENCE public.mesa_pk_mesa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.mesa_pk_mesa_seq;
       public          postgres    false    222            -           0    0    mesa_pk_mesa_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.mesa_pk_mesa_seq OWNED BY public.mesa.pk_mesa;
          public          postgres    false    221            �            1259    42144    pago    TABLE     �   CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    id_factura integer,
    monto double precision,
    forma_pago character varying(255),
    propina double precision
);
    DROP TABLE public.pago;
       public         heap    postgres    false            �            1259    42143    pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pago_id_pago_seq;
       public          postgres    false    234            .           0    0    pago_id_pago_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;
          public          postgres    false    233            �            1259    42072    pedido    TABLE     %  CREATE TABLE public.pedido (
    id_pedido integer NOT NULL,
    id_mesa integer,
    id_usuario integer,
    fecha_de_pedido date,
    hora_cierre time without time zone,
    hora_inicio time without time zone,
    estado_pedido character varying(255) DEFAULT 'Cerrado'::character varying
);
    DROP TABLE public.pedido;
       public         heap    postgres    false            �            1259    42071    pedido_id_pedido_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_id_pedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.pedido_id_pedido_seq;
       public          postgres    false    224            /           0    0    pedido_id_pedido_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.pedido_id_pedido_seq OWNED BY public.pedido.id_pedido;
          public          postgres    false    223            �            1259    42156    queja    TABLE     �   CREATE TABLE public.queja (
    id_queja integer NOT NULL,
    id_cliente integer,
    fecha_hora timestamp without time zone,
    motivo text,
    clasificacion integer,
    id_personal integer,
    id_item integer
);
    DROP TABLE public.queja;
       public         heap    postgres    false            �            1259    42155    queja_id_queja_seq    SEQUENCE     �   CREATE SEQUENCE public.queja_id_queja_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.queja_id_queja_seq;
       public          postgres    false    236            0           0    0    queja_id_queja_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.queja_id_queja_seq OWNED BY public.queja.id_queja;
          public          postgres    false    235            �            1259    42051    usuario    TABLE     �   CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(255),
    rol character varying(255),
    contrasena character varying(255),
    email character varying(255)
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    42050    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          postgres    false    220            1           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    219            M           2604    42038    area id_area    DEFAULT     l   ALTER TABLE ONLY public.area ALTER COLUMN id_area SET DEFAULT nextval('public.area_id_area_seq'::regclass);
 ;   ALTER TABLE public.area ALTER COLUMN id_area DROP DEFAULT;
       public          postgres    false    215    216    216            N           2604    42045    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    218    217    218            T           2604    42101    detallepedido id_detallepedido    DEFAULT     �   ALTER TABLE ONLY public.detallepedido ALTER COLUMN id_detallepedido SET DEFAULT nextval('public.detallepedido_id_detallepedido_seq'::regclass);
 M   ALTER TABLE public.detallepedido ALTER COLUMN id_detallepedido DROP DEFAULT;
       public          postgres    false    228    227    228            U           2604    42118    encuesta id_encuesta    DEFAULT     |   ALTER TABLE ONLY public.encuesta ALTER COLUMN id_encuesta SET DEFAULT nextval('public.encuesta_id_encuesta_seq'::regclass);
 C   ALTER TABLE public.encuesta ALTER COLUMN id_encuesta DROP DEFAULT;
       public          postgres    false    229    230    230            V           2604    42130    factura id_factura    DEFAULT     x   ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);
 A   ALTER TABLE public.factura ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    232    231    232            S           2604    42092    item id_item    DEFAULT     l   ALTER TABLE ONLY public.item ALTER COLUMN id_item SET DEFAULT nextval('public.item_id_item_seq'::regclass);
 ;   ALTER TABLE public.item ALTER COLUMN id_item DROP DEFAULT;
       public          postgres    false    225    226    226            P           2604    42063    mesa pk_mesa    DEFAULT     l   ALTER TABLE ONLY public.mesa ALTER COLUMN pk_mesa SET DEFAULT nextval('public.mesa_pk_mesa_seq'::regclass);
 ;   ALTER TABLE public.mesa ALTER COLUMN pk_mesa DROP DEFAULT;
       public          postgres    false    222    221    222            W           2604    42147    pago id_pago    DEFAULT     l   ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);
 ;   ALTER TABLE public.pago ALTER COLUMN id_pago DROP DEFAULT;
       public          postgres    false    233    234    234            Q           2604    42075    pedido id_pedido    DEFAULT     t   ALTER TABLE ONLY public.pedido ALTER COLUMN id_pedido SET DEFAULT nextval('public.pedido_id_pedido_seq'::regclass);
 ?   ALTER TABLE public.pedido ALTER COLUMN id_pedido DROP DEFAULT;
       public          postgres    false    223    224    224            X           2604    42159    queja id_queja    DEFAULT     p   ALTER TABLE ONLY public.queja ALTER COLUMN id_queja SET DEFAULT nextval('public.queja_id_queja_seq'::regclass);
 =   ALTER TABLE public.queja ALTER COLUMN id_queja DROP DEFAULT;
       public          postgres    false    235    236    236            O           2604    42054    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    220    219    220                      0    42035    area 
   TABLE DATA           /   COPY public.area (id_area, nombre) FROM stdin;
    public          postgres    false    216   Vo                 0    42042    cliente 
   TABLE DATA           E   COPY public.cliente (id_cliente, nit, nombre, direccion) FROM stdin;
    public          postgres    false    218   �o                 0    42098    detallepedido 
   TABLE DATA           a   COPY public.detallepedido (id_detallepedido, id_pedido, id_item, cantidad, subtotal) FROM stdin;
    public          postgres    false    228   3p                 0    42115    encuesta 
   TABLE DATA           o   COPY public.encuesta (id_encuesta, id_pedido, amabilidad_mesero, calidad_comida, exactitud_pedido) FROM stdin;
    public          postgres    false    230   }p                 0    42127    factura 
   TABLE DATA           ~   COPY public.factura (id_factura, id_pedido, fecha_hora_emision, total_sin_propina, total_con_propina, id_cliente) FROM stdin;
    public          postgres    false    232   �p                 0    42089    item 
   TABLE DATA           J   COPY public.item (id_item, nombre, descripcion, precio, tipo) FROM stdin;
    public          postgres    false    226   ;q                 0    42060    mesa 
   TABLE DATA           [   COPY public.mesa (pk_mesa, id_mesa, id_area, personas_mesa, es_para_fumadores) FROM stdin;
    public          postgres    false    222   �q                 0    42144    pago 
   TABLE DATA           O   COPY public.pago (id_pago, id_factura, monto, forma_pago, propina) FROM stdin;
    public          postgres    false    234   �r                 0    42072    pedido 
   TABLE DATA           z   COPY public.pedido (id_pedido, id_mesa, id_usuario, fecha_de_pedido, hora_cierre, hora_inicio, estado_pedido) FROM stdin;
    public          postgres    false    224   s                  0    42156    queja 
   TABLE DATA           n   COPY public.queja (id_queja, id_cliente, fecha_hora, motivo, clasificacion, id_personal, id_item) FROM stdin;
    public          postgres    false    236   �s                 0    42051    usuario 
   TABLE DATA           M   COPY public.usuario (id_usuario, nombre, rol, contrasena, email) FROM stdin;
    public          postgres    false    220   t       2           0    0    area_id_area_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.area_id_area_seq', 4, true);
          public          postgres    false    215            3           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 10, true);
          public          postgres    false    217            4           0    0 "   detallepedido_id_detallepedido_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.detallepedido_id_detallepedido_seq', 14, true);
          public          postgres    false    227            5           0    0    encuesta_id_encuesta_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.encuesta_id_encuesta_seq', 5, true);
          public          postgres    false    229            6           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 11, true);
          public          postgres    false    231            7           0    0    item_id_item_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.item_id_item_seq', 2, true);
          public          postgres    false    225            8           0    0    mesa_pk_mesa_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.mesa_pk_mesa_seq', 48, true);
          public          postgres    false    221            9           0    0    pago_id_pago_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.pago_id_pago_seq', 8, true);
          public          postgres    false    233            :           0    0    pedido_id_pedido_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.pedido_id_pedido_seq', 12, true);
          public          postgres    false    223            ;           0    0    queja_id_queja_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.queja_id_queja_seq', 2, true);
          public          postgres    false    235            <           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 2, true);
          public          postgres    false    219            Z           2606    42040    area area_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id_area);
 8   ALTER TABLE ONLY public.area DROP CONSTRAINT area_pkey;
       public            postgres    false    216            \           2606    42049    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    218            f           2606    42103     detallepedido detallepedido_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT detallepedido_pkey PRIMARY KEY (id_detallepedido);
 J   ALTER TABLE ONLY public.detallepedido DROP CONSTRAINT detallepedido_pkey;
       public            postgres    false    228            h           2606    42120    encuesta encuesta_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.encuesta
    ADD CONSTRAINT encuesta_pkey PRIMARY KEY (id_encuesta);
 @   ALTER TABLE ONLY public.encuesta DROP CONSTRAINT encuesta_pkey;
       public            postgres    false    230            j           2606    42132    factura factura_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);
 >   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_pkey;
       public            postgres    false    232            d           2606    42096    item item_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id_item);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            postgres    false    226            `           2606    42065    mesa mesa_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT mesa_pkey PRIMARY KEY (pk_mesa);
 8   ALTER TABLE ONLY public.mesa DROP CONSTRAINT mesa_pkey;
       public            postgres    false    222            l           2606    42149    pago pago_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            postgres    false    234            b           2606    42077    pedido pedido_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (id_pedido);
 <   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_pkey;
       public            postgres    false    224            n           2606    42163    queja queja_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.queja
    ADD CONSTRAINT queja_pkey PRIMARY KEY (id_queja);
 :   ALTER TABLE ONLY public.queja DROP CONSTRAINT queja_pkey;
       public            postgres    false    236            ^           2606    42058    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    220            {           2620    50372 /   usuario encode_password_before_insert_or_update    TRIGGER     �   CREATE TRIGGER encode_password_before_insert_or_update BEFORE INSERT OR UPDATE ON public.usuario FOR EACH ROW EXECUTE FUNCTION public.encode_password_base64();
 H   DROP TRIGGER encode_password_before_insert_or_update ON public.usuario;
       public          postgres    false    237    220            r           2606    42109 (   detallepedido detallepedido_id_item_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT detallepedido_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
 R   ALTER TABLE ONLY public.detallepedido DROP CONSTRAINT detallepedido_id_item_fkey;
       public          postgres    false    228    226    4708            s           2606    42104 *   detallepedido detallepedido_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detallepedido
    ADD CONSTRAINT detallepedido_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedido(id_pedido);
 T   ALTER TABLE ONLY public.detallepedido DROP CONSTRAINT detallepedido_id_pedido_fkey;
       public          postgres    false    224    228    4706            t           2606    42121     encuesta encuesta_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.encuesta
    ADD CONSTRAINT encuesta_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedido(id_pedido);
 J   ALTER TABLE ONLY public.encuesta DROP CONSTRAINT encuesta_id_pedido_fkey;
       public          postgres    false    4706    230    224            u           2606    42138    factura factura_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 I   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_id_cliente_fkey;
       public          postgres    false    232    4700    218            v           2606    42133    factura factura_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedido(id_pedido);
 H   ALTER TABLE ONLY public.factura DROP CONSTRAINT factura_id_pedido_fkey;
       public          postgres    false    232    4706    224            o           2606    42066    mesa mesa_id_area_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT mesa_id_area_fkey FOREIGN KEY (id_area) REFERENCES public.area(id_area);
 @   ALTER TABLE ONLY public.mesa DROP CONSTRAINT mesa_id_area_fkey;
       public          postgres    false    216    4698    222            w           2606    42150    pago pago_id_factura_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura);
 C   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_id_factura_fkey;
       public          postgres    false    4714    232    234            p           2606    42078    pedido pedido_id_mesa_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_id_mesa_fkey FOREIGN KEY (id_mesa) REFERENCES public.mesa(pk_mesa);
 D   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_id_mesa_fkey;
       public          postgres    false    4704    222    224            q           2606    42083    pedido pedido_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 G   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_id_usuario_fkey;
       public          postgres    false    4702    220    224            x           2606    42164    queja queja_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.queja
    ADD CONSTRAINT queja_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 E   ALTER TABLE ONLY public.queja DROP CONSTRAINT queja_id_cliente_fkey;
       public          postgres    false    218    236    4700            y           2606    42174    queja queja_id_item_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.queja
    ADD CONSTRAINT queja_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
 B   ALTER TABLE ONLY public.queja DROP CONSTRAINT queja_id_item_fkey;
       public          postgres    false    226    4708    236            z           2606    42169    queja queja_id_personal_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.queja
    ADD CONSTRAINT queja_id_personal_fkey FOREIGN KEY (id_personal) REFERENCES public.usuario(id_usuario);
 F   ALTER TABLE ONLY public.queja DROP CONSTRAINT queja_id_personal_fkey;
       public          postgres    false    236    220    4702               -   x�3�H,���2�N���S0�2����L8R���s�b���� �Q#         �   x�=��
�0E�3_���<�N��"�� �(n�&HPI�Ư7���:�Ñ �6U]4�9��K�],�L,�h٢����V��='�b_�UN��������\���'��l�Ȑ��"��E�,�P��ߵ���t��e��_�i,�         :   x�=��	 0��0Ũ��t�9*�%��"��8F�Q1�}lf���m��W%�w�|�KI         3   x�ʱ  ��=�!ن����K�34���Io�O��/F�+4XwIz��"         k   x�]���0�3�
7`�\���Z�� ����d��c7�EV��j�D� ��0Ld�r��Z�kd�̼��Bҟ�Vg;,�'��(��vOt.�%=��w����         q   x�M�1�0��+��2 > M��is@$�S�]�{�TiV��h[zp�Kڊ���X��QW|��Y#g�� ~/[��4�6]Ϙ40=eMrz��T��9�`�u4���_�s��'�         �   x�-�ۍ�0��b�(?��}o�Kr1���3���3��fB�	L�o�ƌ�y2�Xoc���g�8�>�����W��`���0So/�d�D��ŲJ�����b��o��DX-��VR����FY� ��R�4�洏ص|�����a֨;��{���!c��5`6@�-XS0Kos�ı���]��hF]r۳+�[kP��㽌�m\/i�q���6�#�_��o��UBNS         K   x�3�4�440�tMKM.�,�r��8�8M8C��RK9M��8-9�-�L�B1~\�@�����B���hB1z\\\ ���         m   x�e�K� D��.���@�^Í��M��Lg�L����[���	��O�R�y5��� 	f�\AYk�O�;P��2CnF�k�oG0����.��c�^����c6��-�          l   x�3�4�4202�50�54P04�24�20��IT�H�M*-J/M-NTH-.ILJTH.*MI�4BC.�����5G�8��,393_!�4U!��R!'5�$h�!g�W�  HD         i   x�3�t�KTp��M���M-N-��Lvw�J�r���
��L�K�K�:�V$���%��rq:'��+�fVq:g��qFe�De�V���r&�e����(�b���� ��&2     